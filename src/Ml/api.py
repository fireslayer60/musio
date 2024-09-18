from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import BertForSequenceClassification, BertTokenizer
import torch
from torch.nn.functional import softmax
from sklearn.preprocessing import LabelEncoder

app = FastAPI()

downloads_folder = 'C:/Users/krish/Downloads'
model_name = f'{downloads_folder}/my_special_model_v1.pth'
tokenizer_name = f'{downloads_folder}/my_special_tokenizer_directory'

label_encoder = LabelEncoder()
label_encoder.classes_ = ['Anxiety', 'Bipolar', 'Depression', 'Normal', 'Personality disorder', 'Stress', 'Suicidal']
inverse_label_mapping = {i: label for i, label in enumerate(label_encoder.classes_)}

tokenizer = BertTokenizer.from_pretrained(tokenizer_name)
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=len(label_encoder.classes_))
model.load_state_dict(torch.load(model_name))
model.eval()

device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device)

class TextInput(BaseModel):
    text: str

@app.post("/predict")
async def predict(input: TextInput):
    try:
        inputs = tokenizer(input.text, return_tensors='pt', truncation=True, padding=True, max_length=128)
        input_ids = inputs['input_ids'].to(device)
        attention_mask = inputs['attention_mask'].to(device)

        with torch.no_grad():
            outputs = model(input_ids=input_ids, attention_mask=attention_mask)
            logits = outputs.logits
            probabilities = softmax(logits, dim=1)

        predictions = torch.argmax(logits, dim=1)
        predicted_label = inverse_label_mapping[predictions.item()]

        response = {
            "prediction": predicted_label,
            "probabilities": {inverse_label_mapping[idx]: prob.item() * 100 for idx, prob in enumerate(probabilities[0])}
        }
        for i in response['probabilities'].values():
            print(i)

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
