import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from transformers import AutoModel, AutoTokenizer, AutoModelForSequenceClassification, AutoModelForSeq2SeqLM, AutoModelForCausalLM
from transformers import pipeline
from medical_data.medical_data_class import UserMedicalProfile

def setup_clinical_model():
    
    """Setups clincal bert 

    Returns:
        _type_: _description_
    """
    
    # Load tokenizer and model
    model_name = "google/flan-t5-base"
    # model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    return model, tokenizer
    

def create_user_information_context(user_data: UserMedicalProfile):
    """Creates a context with user information

    Args:
        user_data (UserMedicalProfile): A UserMedicalProfile object with a users information
    """
    # context = "The patient "+ user_data.name + " is a "+ str(user_data.age) +"-year-old "+ user_data.gender + " who is " + str(user_data.weight) + " kilograms and " + str(user_data.height) +" centimeters tall with the following medical conditions: \n"
    context = f"""
        The patient {user_data.username} is a {user_data.age}-year old {user_data.gender} who is {user_data.weight} kilograms and {user_data.height} centimeters tall \n 
        With the following conditions:
        - {user_data.medical_conditions}
    """
    return context

def diagnoisis_cb(user_data: UserMedicalProfile, model: AutoModel, tokenizer: AutoTokenizer, current_symptoms: str):

    context = create_user_information_context(user_data)
    print("="*50)
    print("CONTEXT: ", context)
    print("="*50)
    print("="*50)
    print("CURRENT_SYMPTOMS: ", current_symptoms)
    print("="*50)
    context += "The patient currently feels: " + current_symptoms
    question = "What is the likely diagnosis? Do not repeat any of the user's prior medical history."    
    input_text = f"question: {question}  context: {context}"
    # Tokenize the input
    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)
    # Generate the answer
    output = model.generate(inputs["input_ids"], max_new_tokens=100, num_beams=5)
    # Decode the output
    answer = tokenizer.decode(output[0], skip_special_tokens=True)
    return answer
    

# if __name__ == "__main__":
    # new_pipe = setup_qa_pipeline()
    # user_data = UserMedicalProfile(1, "l", "l", 72, 183, "Brandon", 20, "male", {"Allergies": ["Peanuts"]})
    # print(qanda_cb(user_data, "What conditions might the patient have?", new_pipe))
    

    # Define the context and question
    # context = "A 50-year-old male with a history of hypertension experiences chest pain radiating to the left arm. His blood pressure is 160/100, and ECG indicates."
    

    # # Format the input for T5 (Question + Context)
    # input_text = f"question: {question}  context: {context}"

    # # Tokenize the input
    # inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)

    # # Generate the answer
    # output = model.generate(inputs["input_ids"], max_new_tokens=100, num_beams=5)

    # # Decode the output
    # answer = tokenizer.decode(output[0], skip_special_tokens=True)
    # print(answer)
    
    # # qa_pipeline = pipeline("question-answering", model="t5-base", tokenizer="t5-base")
    # model, tokenizer = setup_clincal_bert_classification()

    # # Define context and question
    # context = "The patient is 72 years old, has hypertension, and was recently diagnosed with mild cognitive impairment."
    # question = "What diagnosis does the patient have?"

    # # Get the answer
    # # result = qa_pipeline(question=question, context=context)

    # print(f"Answer: {result['answer']}")