APP_NAME=front_ordem_servico
DOCKER_IMAGE=api-chamados:v2

# Cores para output
RESET = \033[0m
GREEN = \033[32m
YELLOW = \033[33m
RED = \033[31m

deploy:
	@echo "$(YELLOW)Verificando se estou no diretório da $(APP_NAME)...$(RESET)"
	@echo "$(YELLOW)Diretório atual: $(shell pwd)$(RESET)"
	@echo "$(RED)Parando e removendo contêineres antigos...$(RESET)"
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true
	docker rmi $(DOCKER_IMAGE) || true
	@echo "$(GREEN)Construindo a imagem do Docker...$(RESET)"
	docker compose up -d --build
	@echo "$(GREEN)Aguardando o contêiner $(APP_NAME) iniciar...$(RESET)"
	@docker ps -a --filter "name=$(APP_NAME)" --format "Status: {{.Status}}\nPortas: {{.Ports}}\nImagem: {{.Image}}\n"
	@echo "Logs do contêiner $(APP_NAME):"
	docker logs -f $(APP_NAME) --tail 10