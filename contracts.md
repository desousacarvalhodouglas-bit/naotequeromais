# Contratos Backend - ServiVizinhos

## 1. Dados Mockados a Substituir

### Frontend Mock Data (`/frontend/src/mock/data.js`)
- ✅ `mockPosts` - Posts de serviços
- ✅ `mockThemes` - Temáticas do momento
- ✅ Auth context - Login/Register mockado

## 2. Modelos de Dados (MongoDB)

### User
```python
{
  "_id": ObjectId,
  "name": str,
  "email": str (unique),
  "password_hash": str,
  "location": str,
  "phone": str (optional),
  "avatar": str (optional),
  "account_type": str,  # particular, autonomo, empresa
  "created_at": datetime,
  "updated_at": datetime
}
```

### Post (Pedido de Serviço)
```python
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "description": str,
  "location": str,
  "budget": str,
  "images": [str],  # URLs
  "videos": [str],  # URLs
  "likes": int,
  "recommends": int,
  "responses": int,
  "created_at": datetime,
  "updated_at": datetime
}
```

### PostInteraction
```python
{
  "_id": ObjectId,
  "post_id": ObjectId,
  "user_id": ObjectId,
  "type": str,  # like, recommend, respond
  "response_text": str (optional),
  "created_at": datetime
}
```

### Message (Conversas)
```python
{
  "_id": ObjectId,
  "conversation_id": str,
  "sender_id": ObjectId,
  "receiver_id": ObjectId,
  "text": str,
  "images": [str],
  "read": bool,
  "created_at": datetime
}
```

## 3. API Endpoints

### Autenticação
- ✅ `POST /api/auth/register` - Registro de usuário
- ✅ `POST /api/auth/login` - Login e retorna token JWT
- ✅ `GET /api/auth/me` - Retorna dados do usuário autenticado

### Posts (Pedidos)
- `GET /api/posts` - Lista todos os posts (paginado)
- `POST /api/posts` - Criar novo post
- `GET /api/posts/{id}` - Detalhes de um post
- `DELETE /api/posts/{id}` - Deletar post (apenas autor)

### Interações
- `POST /api/posts/{id}/like` - Curtir/descurtir post
- `POST /api/posts/{id}/recommend` - Recomendar/desrecomendar post
- `POST /api/posts/{id}/respond` - Responder a um post
- `GET /api/posts/{id}/responses` - Listar respostas de um post

### Mensagens
- `GET /api/messages/conversations` - Lista conversas do usuário
- `GET /api/messages/{conversation_id}` - Mensagens de uma conversa
- `POST /api/messages` - Enviar mensagem

## 4. Integração Frontend-Backend

### Substituir em AuthContext.jsx
```javascript
// De: Mock login/register
// Para: Chamadas reais para /api/auth/login e /api/auth/register
```

### Substituir em Home.jsx
```javascript
// De: mockPosts importado de mock/data.js
// Para: useEffect(() => { fetchPosts() }, [])
// Ações: handlePublish, handleLike, handleRecommend, handleRespond
// Para: Chamadas API reais
```

### Manter componentização
- Header.jsx - sem mudanças
- PostCard component - sem mudanças estruturais
- Modais - sem mudanças estruturais

## 5. Fluxo de Implementação

1. ✅ Criar modelos Pydantic no backend
2. ✅ Implementar routers (auth, posts, interactions, messages)
3. ✅ Atualizar AuthContext para usar API real
4. ✅ Atualizar Home.jsx para usar API real
5. ✅ Testar endpoints com testing agent

## 6. Autenticação JWT

- Token expira em 7 dias
- Header: `Authorization: Bearer <token>`
- Middleware de autenticação valida token em rotas protegidas
