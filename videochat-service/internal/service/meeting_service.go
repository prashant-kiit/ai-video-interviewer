package service

import (
	"github.com/redis/go-redis/v9"
)

type MeetingService struct {
	Redis *redis.Client
}
