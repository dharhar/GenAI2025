from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline
from medical_data.medical_data_class import UserMedicalProfile

def setup_clincal_bert_classification():
    
    """Setups clincal bert 

    Returns:
        _type_: _description_
    """
    
    # Load tokenizer and model
    model_name = "emilyalsentzer/Bio_ClinicalBERT"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    return model, tokenizer


def setup_qa_pipeline():
    """Setsup the Q&A pipeline for clincal bert
    """
    
    return pipeline("question-answering", model="emilyalsentzer/Bio_ClinicalBERT", tokenizer="emilyalsentzer/Bio_ClinicalBERT")
    
    
def qanda_cb(user_data :UserMedicalProfile, user_text: str, qa_pipeline: pipeline):
    """Takes users live query and uses Q&A pipeline to answer the question

    Args:
        user_data (UserMedicalProfile): _description_
        user_text (str): _description_
    """
    
    # Load a Question-Answering pipeline with ClinicalBERT or another medical model

    # Example context (clinical document)
    context = "The patient "+ user_data.name + " is a "+ user_data.age +"-year-old "+ user_data.gender + " with the following medical conditions: " + str(user_data.medical_conditions)
    # Example question
    question = user_text
    # Get the answer
    answer = qa_pipeline(question=question, context=context)

    return answer['answer']

# def diagnoisis_cb()