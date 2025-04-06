import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { GOOGLE_SPEECH_API_KEY } from '@env';

export default function useVoiceRecognition() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recording, setRecording] = useState(null);

  const recordingSettings = {
    android: {
      extension: '.wav',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_PCM_16BIT,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_PCM_16BIT,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 256000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 16000,
      numberOfChannels: 1,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startListening = async () => {
    try {
      await Audio.requestPermissionsAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(recordingSettings);

      setRecording(recording);
      setIsListening(true);
      console.log('Recording started and set in state!');
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopListening = async () => {
    console.log('Stopping recording...');
    setIsListening(false);

    if (!recording) {
      console.warn('No recording found to stop.');
      return;
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);

    if (!uri) {
      console.warn('No URI found after recording.');
      return;
    }

    console.log('Recording stopped. URI:', uri);

    const fileBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });


    const body = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
      audio: {
        content: fileBase64,
      },
    };

    try {
      console.log('Sending request to Google Speech API...');
      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_SPEECH_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log('Full Google response:', JSON.stringify(data, null, 2));

      const allText = data.results
        ?.map(result => result.alternatives?.[0]?.transcript)
        .filter(Boolean)
        .join(' ');

      if (allText) {
        console.log('Full Transcript:', allText);
        setTranscript(allText);
      } else {
        console.log(' No transcript found in response.');
      }
    } catch (err) {
      console.error(' Error with speech recognition request:', err);
    }
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
  };
}
