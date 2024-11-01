import Image from "next/image"


// STYLES
import './style.scss';
import Link from "next/link";

export default function NewAlbumReleasesItem({ item } : { item : SpotifyApi.AlbumObjectSimplified })  {
    const albumArtists = item.artists.map(artist => artist.name).join(', ');

    
    return (
        <Link href={`/albums/${ item?.id }`}>
            <article className="new-album-releases-item">
                <Image
                    className="new-album-releases-item__image"
                    
                    src={ item?.images[0]?.url }
                    width={ item?.images[0]?.width }
                    height={ item?.images[0]?.height }
                    
                    alt={ `Album art for ${ item?.name }` }
                    >

                </Image>
                <article className="new-album-releases-item__info-section">
                    <section className="new-album-releases-item__info-section__info">
                        <h4 className=".new-album-releases-item__info_heading">{ item?.name }</h4>
                        <p className="new-album-releases-item__info__artists light">{ albumArtists }</p>
                    </section>
                    <div className="new-album-releases-item__info-section__total-tracks">
                        <p>{`${item?.total_tracks} songs`}</p>
                    </div>
                </article>
            </article>
        </Link>
    )
}