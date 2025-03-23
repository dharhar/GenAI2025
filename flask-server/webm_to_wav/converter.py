from pydub import AudioSegment
import os


def convert_webm_to_wav(input_file, output_directory=None, filename=None):
    wav_output_path = os.path.join(os.getcwd(), "webm_to_wav/output_audio.wav")
    input_file.save(wav_output_path)  
    return wav_output_path

# Example usage
if __name__ == "__main__":
    # Assuming the script is in the same directory as the WebM file
    current_directory = os.path.dirname(os.path.abspath(__file__))
    webm_file = os.path.join(current_directory, "recording.webm")
    
    # Create a directory for WAV files if needed
    wav_directory = os.path.join(current_directory, "wav_files")
    
    # Convert the file
    convert_webm_to_wav(webm_file, wav_directory)