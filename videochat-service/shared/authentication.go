package shared

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func GenerateJWT(username string) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return "", errors.New("JWT_SECRET is not set")
	}

	jwtSecret := []byte(secret)

	claims := jwt.MapClaims{
		"username": username,
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(jwtSecret)
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("AuthMiddleware called")

		var tokenStr string

		// 1️⃣ Try Authorization header first
		auth := r.Header.Get("Authorization")
		if auth != "" {
			parts := strings.SplitN(auth, " ", 2)
			if len(parts) != 2 || parts[0] != "Bearer" {
				SendError(w, "invalid authorization header", http.StatusUnauthorized)
				return
			}
			tokenStr = parts[1]
		} else {
			// 2️⃣ Fallback to query param (WebSocket support)
			tokenStr = r.URL.Query().Get("token")
			if tokenStr == "" {
				SendError(w, "missing auth token", http.StatusUnauthorized)
				return
			}
		}

		// 3️⃣ Parse JWT
		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (any, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			SendError(w, "invalid or expired token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			SendError(w, "invalid claims", http.StatusUnauthorized)
			return
		}

		username, ok := claims["username"].(string)
		if !ok {
			SendError(w, "missing / invalid username", http.StatusUnauthorized)
			return
		}

		// 4️⃣ Attach user to context
		ctx := context.WithValue(r.Context(), "username", username)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
