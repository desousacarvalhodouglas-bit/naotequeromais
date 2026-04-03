#!/usr/bin/env python3
"""
Backend API Tests for ServiVizinhos
Tests all the endpoints specified in the review request
"""

import requests
import json
import sys
from datetime import datetime

# Use the production URL from frontend/.env
BASE_URL = "https://crazy-newton-7.preview.emergentagent.com/api"

class ServiVizinhosAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.access_token = None
        self.user_data = None
        self.post_id = None
        self.test_results = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()

    def test_health_check(self):
        """Test 1: Health Check - GET /api/"""
        try:
            response = requests.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "ServiVizinhos API is running":
                    self.log_test("Health Check", True, "API is running correctly", data)
                    return True
                else:
                    self.log_test("Health Check", False, f"Unexpected message: {data}", data)
                    return False
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False

    def test_user_registration(self):
        """Test 2: User Registration - POST /api/auth/register"""
        try:
            user_data = {
                "name": "João Silva",
                "email": "joao@teste.com",
                "password": "senha123",
                "location": "São Paulo, SP",
                "account_type": "particular"
            }
            
            response = requests.post(
                f"{self.base_url}/auth/register",
                json=user_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.access_token = data["access_token"]
                    self.user_data = data["user"]
                    self.log_test("User Registration", True, "User registered successfully", {
                        "has_token": bool(data.get("access_token")),
                        "user_name": data.get("user", {}).get("name"),
                        "user_email": data.get("user", {}).get("email")
                    })
                    return True
                else:
                    self.log_test("User Registration", False, "Missing access_token or user data", data)
                    return False
            else:
                self.log_test("User Registration", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("User Registration", False, f"Exception: {str(e)}")
            return False

    def test_user_login(self):
        """Test 3: User Login - POST /api/auth/login"""
        try:
            # Using query parameters as specified in the review request
            response = requests.post(
                f"{self.base_url}/auth/login?email=joao@teste.com&password=senha123"
            )
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    # Update token in case it's different
                    self.access_token = data["access_token"]
                    self.user_data = data["user"]
                    self.log_test("User Login", True, "Login successful", {
                        "has_token": bool(data.get("access_token")),
                        "user_name": data.get("user", {}).get("name"),
                        "user_email": data.get("user", {}).get("email")
                    })
                    return True
                else:
                    self.log_test("User Login", False, "Missing access_token or user data", data)
                    return False
            else:
                self.log_test("User Login", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("User Login", False, f"Exception: {str(e)}")
            return False

    def test_create_post(self):
        """Test 4: Create Post - POST /api/posts"""
        if not self.access_token:
            self.log_test("Create Post", False, "No access token available")
            return False
            
        try:
            post_data = {
                "description": "Preciso de um eletricista urgente",
                "location": "São Paulo, SP",
                "budget": "R$ 200",
                "images": [],
                "videos": []
            }
            
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            response = requests.post(
                f"{self.base_url}/posts",
                json=post_data,
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data or "_id" in data:
                    self.post_id = data.get("id") or data.get("_id")
                    self.log_test("Create Post", True, f"Post created with ID: {self.post_id}", {
                        "post_id": self.post_id,
                        "description": data.get("description"),
                        "location": data.get("location"),
                        "budget": data.get("budget")
                    })
                    return True
                else:
                    self.log_test("Create Post", False, "No post ID returned", data)
                    return False
            else:
                self.log_test("Create Post", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Create Post", False, f"Exception: {str(e)}")
            return False

    def test_list_posts(self):
        """Test 5: List Posts - GET /api/posts"""
        if not self.access_token:
            self.log_test("List Posts", False, "No access token available")
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}"
            }
            
            response = requests.get(
                f"{self.base_url}/posts",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("List Posts", True, f"Retrieved {len(data)} posts", {
                        "post_count": len(data),
                        "has_our_post": any(post.get("id") == self.post_id or post.get("_id") == self.post_id for post in data) if self.post_id else False
                    })
                    return True
                else:
                    self.log_test("List Posts", False, "Response is not a list", data)
                    return False
            else:
                self.log_test("List Posts", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("List Posts", False, f"Exception: {str(e)}")
            return False

    def test_like_post(self):
        """Test 6: Like Post - POST /api/posts/{post_id}/like"""
        if not self.access_token or not self.post_id:
            self.log_test("Like Post", False, "No access token or post ID available")
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}"
            }
            
            response = requests.post(
                f"{self.base_url}/posts/{self.post_id}/like",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if "liked" in data and "likes" in data:
                    self.log_test("Like Post", True, f"Post liked: {data['liked']}, Total likes: {data['likes']}", data)
                    return True
                else:
                    self.log_test("Like Post", False, "Missing liked or likes in response", data)
                    return False
            else:
                self.log_test("Like Post", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Like Post", False, f"Exception: {str(e)}")
            return False

    def test_recommend_post(self):
        """Test 7: Recommend Post - POST /api/posts/{post_id}/recommend"""
        if not self.access_token or not self.post_id:
            self.log_test("Recommend Post", False, "No access token or post ID available")
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}"
            }
            
            response = requests.post(
                f"{self.base_url}/posts/{self.post_id}/recommend",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if "recommended" in data and "recommends" in data:
                    self.log_test("Recommend Post", True, f"Post recommended: {data['recommended']}, Total recommends: {data['recommends']}", data)
                    return True
                else:
                    self.log_test("Recommend Post", False, "Missing recommended or recommends in response", data)
                    return False
            else:
                self.log_test("Recommend Post", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Recommend Post", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting ServiVizinhos Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        print()
        
        # Run tests in order
        tests = [
            self.test_health_check,
            self.test_user_registration,
            self.test_user_login,
            self.test_create_post,
            self.test_list_posts,
            self.test_like_post,
            self.test_recommend_post
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
        
        print("=" * 60)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Backend API is working correctly.")
        else:
            print(f"⚠️  {total - passed} test(s) failed. Check the details above.")
            
        return passed == total

    def print_summary(self):
        """Print detailed test summary"""
        print("\n" + "=" * 60)
        print("📋 DETAILED TEST SUMMARY")
        print("=" * 60)
        
        for result in self.test_results:
            status = "✅ PASS" if result["success"] else "❌ FAIL"
            print(f"{status} {result['test']}")
            if result["details"]:
                print(f"   Details: {result['details']}")
            if result["response_data"] and not result["success"]:
                print(f"   Response: {result['response_data']}")
            print()

def main():
    """Main test execution"""
    tester = ServiVizinhosAPITester()
    
    try:
        success = tester.run_all_tests()
        tester.print_summary()
        
        # Exit with appropriate code
        sys.exit(0 if success else 1)
        
    except KeyboardInterrupt:
        print("\n🛑 Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()