# ai-video-interviewer

Resources:
1. https://www.youtube.com/watch?v=g42yNO_dxWQ&t=15s
2. https://www.youtube.com/watch?v=8I2axE6j204&t=12s
3. https://www.youtube.com/watch?v=8GK8R77Bd7g
4. https://www.youtube.com/watch?v=xEDCEmqyvC8

Ideas:
1. Use JAM Stack
2. Use CSR, SSR, SSG, ISG, SWR with Redis
3. Use Pipeline to setup project anywhere
4. Try PWA with Next


Todos:
1. Add Security for Server Action
2. Refactor the NextJS folder as per Angular conventions
3. Add User Activity Log
4. Add SSL/TLS Certificate
5. Add SQLLite for state management
6. Add Docker Local Configuration
7. Make Registration for unique usernames
8. Add Data Validation in APIs
9. Add JWT Authentication
10. Implement Role-Based Access Control
11. Add CORS
12. Refactor the handlers and actions
13. Add Authentication Middleware 
14. Add Owner User in Meeting record


Go Package Management:
What each command does
go mod download

Downloads exact versions

Uses go.sum to verify checksums

Does NOT modify go.mod

go mod tidy

Downloads needed deps

Removes unused deps

Updates go.mod and go.sum

go build / go run

Auto-downloads missing deps

Fails if go.sum checksum doesn’t match
