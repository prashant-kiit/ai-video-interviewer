package shared

import (
	"time"
	"os"
	"errors"
	"github.com/golang-jwt/jwt/v5"
)

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
