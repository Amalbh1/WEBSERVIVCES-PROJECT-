# Use the official Python image (non-slim version)
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app/

# Install the necessary Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application code into the container
COPY . /app/

# Expose the port that Flask will run on
EXPOSE 5000

# Set the environment variable to prevent Python from writing .pyc files
ENV PYTHONUNBUFFERED=1

# Define the command to run your application
CMD ["python", "app.py"]
# Install system dependencies needed for MySQL and other libraries
RUN apt-get update && apt-get install -y \
    pkg-config \
    libmariadb-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
