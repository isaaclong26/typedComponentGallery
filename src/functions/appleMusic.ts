
export const configureMusicKit = async (): Promise<any> => {
  const response = await fetch('http://localhost:5000/eloiselife-c5cf6/us-central1/musicAuth/getDeveloperToken', { mode: 'cors' });
  const data = await response.json();
  const developerToken = data.token;

  const musicKitInstance = MusicKit.configure({
    developerToken: developerToken,
    app: {
      name: 'vibez.eloise.life',
      build: '1.0',
    },
  });

  return musicKitInstance;
};

