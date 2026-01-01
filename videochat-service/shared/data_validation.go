package shared

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/go-playground/validator/v10"
)

func Validate[T any](r *http.Request) (T, error) {
	var req T

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return req, errors.New("invalid request body")
	}

	validate := validator.New()
	if err := validate.Struct(req); err != nil {
		return req, err
	}

	return req, nil
}
