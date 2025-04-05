FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install necessary packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        supervisor && \
    rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /home/devops-backend

# Copy and install dependencies
COPY ./requirements /home/devops-backend/requirements
RUN pip install --upgrade pip && pip install --no-cache-dir -r ./requirements/requirements.txt

# Create required directories
RUN mkdir -p /home/devops-backend/media /var/logs/devops /home/docker/scripts

# Copy scripts and ensure boot.sh is executable
COPY ./scripts /home/docker/scripts
RUN chmod +x /home/docker/scripts/boot.sh

# Copy the full application code
COPY ./ /home/devops-backend

# Expose application port
EXPOSE 8000

# Set entrypoint
ENTRYPOINT ["/home/docker/scripts/boot.sh"]
