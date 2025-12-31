package infra

import (
	"context"
	"os"
	"github.com/redis/go-redis/v9"
)

var Ctx = context.Background()

func NewRedisClient() *redis.Client {
	addr := os.Getenv("REDIS_HOST") + ":" + os.Getenv("REDIS_PORT")

	return redis.NewClient(&redis.Options{
		Addr: addr,
	})
}
