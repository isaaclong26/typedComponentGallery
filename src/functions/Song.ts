interface SongData {
    id: string;
    name: string;
    artist: string;
    album: string;
    albumArt?: string;
  }
  
  export class Song implements SongData {
    id: string;
    name: string;
    artist: string;
    album: string;
      albumArt: string | undefined;
  
    constructor(songData: SongData) {
      this.id = songData.id;
      this.name = songData.name;
      this.artist = songData.artist;
      this.album = songData.album;
      if(songData.albumArt) this.albumArt = songData.albumArt;
     
    }
  
    // addToPlaylist(playlist: Playlist): void {
    //   // TODO: Implement add to playlist method
    // }
  
    playNext(): void {
      // TODO: Implement play next method
    }
  
    addToQueue(): void {
      // TODO: Implement add to queue method
    }
  
    remove(): void {
      // TODO: Implement remove method
    }
  }
  

  export const createSongFromApple = (songData: any): Song =>{
    const songAttributes = songData.attributes;
  
    const artworkUrl = songAttributes.artwork ? MusicKit.formatArtworkURL(songAttributes.artwork, 200, 200) : undefined;
  
    const newSongData: SongData = {
      id: songData.id,
      name: songAttributes.name,
      artist: songAttributes.artistName,
      album: songAttributes.albumName,
      albumArt: artworkUrl,
    };
  
    return new Song(newSongData);
  };