
# Complete Documentation: Remote Procedure Call (RPC)

## 1. What Is RPC? (Simple Explanation)
RPC (Remote Procedure Call) allows one computer program to call a function on another computer as if the function were local.

### Explained for a non‑technical person:
Imagine calling a pizza shop to order pizza. You don't go to the shop, you don't see how they make it — you just call and get the result. RPC works the same way.

---
## 2. Why RPC Exists
RPC removes the need to manage complex networking. It handles:
- Sending requests
- Executing remote functions
- Returning results
- Handling errors

---
## 3. How RPC Works (Step-by-Step)
1. Client calls a stub function
2. Stub converts data to message
3. Message is sent to server
4. Server receives and executes
5. Response is sent back
6. Client gets result like a normal function call

---
## 4. RPC Architecture Diagram (Markdown)
```md
              +----------------------+
              |       Client         |
              |  (calls a function)  |
              +-----------+----------+
                          |
                          v
                +-------------------+
                |   Client Stub     |
                |  (packs request)  |
                +---------+---------+
                          |
               ---- Network Layer ----
                          |
                +---------+---------+
                |   Server Stub     |
                | (unpacks request) |
                +---------+---------+
                          |
                          v
              +----------------------+
              |  Server Function     |
              | (actual execution)   |
              +----------------------+
```

---
## 5. Common Use Cases of RPC
- Microservices communication
- Real‑time apps (chat, games)
- High‑performance backend systems
- Internal service communication

---
## 6. Most Popular RPC Technologies
- gRPC
- Apache Thrift
- JSON‑RPC
- XML‑RPC

---
## 7. RPC vs REST API
| Feature | RPC | REST API |
|--------|-----|-----------|
| Communication style | Function calls | Resource-based |
| Speed | Faster | Slower |
| Data format | Binary/JSON | JSON |
| Best for | Internal/microservices | Public APIs |

---
## 8. Non‑Technical Difference (Pizza Example)
RPC: You call and say, "Give me a pizza."
REST: You visit a website menu and choose `/pizza/cheese`.

---
## 9. Applications Using RPC
- Google (gRPC)
- Netflix
- Uber (Apache Thrift)
- WhatsApp
- Online games

---
## 10. Simple RPC Example
You press **Check Balance** on a mobile app:
1. App calls `getBalance()`
2. RPC sends to server
3. Server returns balance
4. App displays result

---
## 11. Simple Code Example
```python
balance = getBalance(101)
print(balance)
```

---
## 12. Summary
- RPC = remote function calls
- Faster than REST
- Used in microservices and internal systems
- REST = better for public APIs

