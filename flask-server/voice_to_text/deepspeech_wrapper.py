from deepspeech import Model
import wave
import os
import numpy as np

def setup_deepspeech():
    """Setsup a deepspeech model
    """
    # Load the pre-trained model
    script_directory = os.path.dirname(os.path.abspath(__file__))

    # Construct the path to the pbmm file in the same directory
    model_path = os.path.join(script_directory, 'deepspeech-0.9.3-models.pbmm')
    return Model(model_path)


def transcribe(model: Model, audio_file: str):
    """Transcribes audio_file to text using model

    Args:
        model (Model): Deepspeech model
        audio_file (str): audio file path
    """
    print("+" * 50)
    print("TRANSCRIBING")
    print("+" * 50)
    # Open audio file
    with wave.open(audio_file, "r") as audio_file:
        frames = audio_file.readframes(audio_file.getnframes())
        audio = np.frombuffer(frames, dtype=np.int16)

    # Run transcription
    ret = model.stt(audio)
    print("Transcription: ", ret)
    return ret