package model

type SignUpRequest struct {
	Name     string `json:"name" validate:"required,min=2"`
	Username string `json:"username" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
}

type SignUpResponse struct {
	ID string `json:"id"`
}

type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}