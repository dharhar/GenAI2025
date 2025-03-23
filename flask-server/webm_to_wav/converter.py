from pydub import AudioSegment
import os


def save_wav(input_file):
    # Save the uploaded file temporarily
    temp_path = os.path.join(os.getcwd(), "webm_to_wav/temp_input")
    input_file.save(temp_path)
    
    # Convert to WAV using pydub
    audio = AudioSegment.from_file(temp_path)
    wav_output_path = os.path.join(os.getcwd(), "webm_to_wav/output_audio.wav")
    audio.export(wav_output_path, format="wav")
    
    # Clean up temporary file
    os.remove(temp_path)
    
    return wav_output_path
    