# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (if any needed for reportlab or other libs)
# reportlab might need some build tools or libraries depending on complexity, 
# but usually the binary wheels work fine on slim. 
# If needed: RUN apt-get update && apt-get install -y build-essential libcairo2-dev

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Create the output directory if it doesn't exist (for generated files)
RUN mkdir -p output

# Expose port 8000
EXPOSE 8000

# Run the application
CMD ["python", "main.py"]
