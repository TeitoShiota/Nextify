'use client'

import { useEffect, useState } from "react"

import { getAlbumNewReleases } from "@/lib/spotify/spotifyApi"
import { getAccessTokenFromCookies } from "@/actions/cookies/sessionCookies"
import NewAlbumReleasesItem from "@/components/Albums/NewAlbumReleasesItem"


// STYLES
import './style.scss';

export default function NewAlbumReleases() {
    const [data, setData] = useState({} as SpotifyApi.ListOfNewReleasesResponse)

    useEffect(() =>{
        const fetchNewReleases = async () => {
            const response = await getAlbumNewReleases({
                limit: 4,
                access_token: await getAccessTokenFromCookies()
            })
            setData(response)
        }
        fetchNewReleases()
    },[])

    return (
        
        <section className="new-album-releases-section">
            {
                    data?.albums?.items.map( ( item ) => {
                        return (
                            <NewAlbumReleasesItem item={item} key={item.id} />
                        )
                    })
                }
        </section>
    )
}