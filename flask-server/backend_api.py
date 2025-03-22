sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from voice_to_text.deepspeech_wrapper import *
from clinical_analysis.clinical_model_wrapper import *
from medical_data.medical_data_class import *


def setup():
    """Setups models
    """
    return setup_clinical_model(), setup_deepspeech()

def transcribe_api(model, audio_file):
    return transcribe(model, audio_file)

