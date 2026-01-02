package shared

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(username string) (string, error) {
	jwtSecret := []byte("super-secret-key") // move to ENV in prod
	
	claims := jwt.MapClaims{
		"username": username,
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(jwtSecret)
}
