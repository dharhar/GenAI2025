import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from voice_to_text.deepspeech_wrapper import *
from clinical_analysis.clinical_model_wrapper import *
from medical_data.medical_data_class import *


def setup():
    """Setups models
    """
    model, tokenizer = setup_clinical_model()
    deepspeech_model = setup_deepspeech()
    return model, tokenizer, deepspeech_model 

def transcribe_api(model, audio_file):

    print(audio_file)
    print("CALLING TRANSCRIBE IN TRANSCRIBE_API") # TODO: remove
    print("*" * 100)
    print("*" * 100)
    return transcribe(model, audio_file)

