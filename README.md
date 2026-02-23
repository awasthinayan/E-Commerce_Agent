# Create a readme file 

## Ai-Services

This is a simple chatbot that uses the OpenAI API to provide answers to questions.

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/Ai-Services.git
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Set up the environment variables:

```bash
export GROQ_API_KEY=YOUR_API_KEY
```

4. Run the application:

```bash
python app.py
```

5. Access the application at http://localhost:8000/

## Usage

To use the application, you can send a POST request to the /chat endpoint with a JSON body containing the following properties:

- `prompt`: The prompt to send to the chatbot.
- `user`: The user's name.

For example, to send a prompt to the chatbot, you can make a POST request to the /chat endpoint with the following JSON body:

```json
{
  "prompt": "What is the capital of France?",
  "user": "John"
}
```

The response will be a JSON object containing the chatbot's response, including the user's name and the time the response was generated.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Testing Data 

{
    "name": "Nayan Awasthi",
    "email": "nayanawasthi2015@gmail.com",
    "preferences": {
        "kpis": [
            "GMV",
            "CAC",
            "LTV"
        ],
        "marketplaces": [
            "Amazon",
            "Flipkart"
        ],
        "categories": [
            "Electronics",
            "Fashion"
        ]
    },
    "_id": "699b05031cf6d24081475c08",
    "createdAt": "2026-02-22T13:30:43.794Z",
    "updatedAt": "2026-02-22T13:30:43.794Z",
    "__v": 0
}