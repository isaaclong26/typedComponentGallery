import React,{useState, useEffect} from "react"


import { Col, Row } from "react-bootstrap"
import {SiteCarousel, SiteDisplay, sites } from "../widgets"
import AppleSignInButton from "../widgets/appleSignIn"
import Library from "../widgets/Library"
import { ChildrenModal } from "../blocks"
import Playlist from "../widgets/Playlist"
import Album from "../widgets/album"
import Song from "../widgets/song"
import SelectedPlaylist from "../widgets/selectedPlaylist"
import { createSongFromApple } from "../../functions/Song"
import  {configureMusicKit}  from "../../functions/appleMusic"



const Home:React.FC<{}>= (props)=>{
    const [libraryData, setLibraryData] = useState<any>({playlists:[], albums:[], songs:[]});
    const [playlist, setPlaylist] = useState<string>()
    const [modal, setModal] = useState<boolean>(false)

    const [musicKit, setMusicKit] = useState<any>();

    useEffect(() => {
      const fetchMusicKitInstance = async () => {
        const instance = await configureMusicKit();
        setMusicKit(instance);
      };
  
      fetchMusicKitInstance();
    }, []);
  
  
    const handleSignIn = async () => {
      try {
        if(musicKit){
            console.log(musicKit)
        await musicKit.authorize().then(()=>{
        console.log('User signed in successfully');
        fetchLibraryData()

       })
        }
    
      } catch (error) {
        console.error('Error signing in:', error);
      }
    };

    const fetchLibraryData = async () => {

        if(musicKit.isAuthorized) {
        
  
        const playlists = await musicKit.api.library.playlists(null, null, {
          include: 'tracks',
          limit: 10,
        });
        console.log(playlists)
        const albums = await musicKit.api.library.albums(null, null, {
          include: 'tracks',
          limit: 10,
        });
        let  songs = await musicKit.api.library.songs(null, null, {
          limit: 10,
        });
        songs = songs.map((song: any) => createSongFromApple(song))

        setLibraryData({ playlists, albums, songs });
      }
      };

      const getSongsForPlaylist = async ( playlistId: string) => {
        let songs = await musicKit.api.library.playlist(playlistId, null, {
          include: 'tracks',
          limit: 100
        });
      
        return songs
      }

      const playListSelect:(x:string)=>void = async(playlist:any)=>{
        console.log("select")
       let x = await getSongsForPlaylist(playlist.id)
       setPlaylist(x)
       setModal(true)

      }
    return (
        <div 
        className="container-fluid px-0">
         <button onClick={handleSignIn}>Sign In to Apple Music</button>

           { libraryData &&    <div>
      <ChildrenModal open={modal} onClose={()=>setModal(false)}>
      <SelectedPlaylist playlist={playlist}/>
      </ChildrenModal>
      {libraryData.playlists.length > 0 && <>
      <h1>My Library</h1>
      <h2>Playlists</h2>
      <ul className="row mx-auto">
        {libraryData.playlists.map((playlist: any) => (
          <Playlist key={playlist.id} playlist={playlist} select={playListSelect}/>
        ))}
      </ul>
      <h2>Albums</h2>
      <ul className='row'>
        {libraryData.albums.map((album: any) => (
          <Album key={album.id}album={album} />
        ))}
      </ul>
      <h2>Songs</h2>
      <ul>
        {libraryData.songs.map((song: any) => (
          <Song key={song.id} song={song}/>
        ))}
      </ul></>}
    </div>}

        </div>
    )
}

export default Home