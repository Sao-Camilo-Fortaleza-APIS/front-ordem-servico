APP_NAME=front_ordem_servico
DOCKER_IMAGE=api-chamados:v2

deploy:
	@echo "Verificando se estou no diretório da $(APP_NAME)..."
	@echo "Diretório atual: $(shell pwd)"
	@echo "Parando e removendo contêineres antigos..."
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true
	docker rmi $(DOCKER_IMAGE) || true
	@echo "Construindo a imagem do Docker..."
	docker compose up -d --build
	@echo "Aguardando o contêiner $(APP_NAME) iniciar..."
	@docker ps -a --filter "name=$(APP_NAME)" --format "Status: {{.Status}}\nPortas: {{.Ports}}\nImagem: {{.Image}}\n"
	@echo "Logs do contêiner $(APP_NAME):"
	docker logs -f $(APP_NAME) --tail 10