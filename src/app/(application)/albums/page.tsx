import NewAlbumReleases from "@/containers/Albums/NewAlbumReleases"

// STYLES
import './style.scss';

export default async function AlbumsPage(){


    return (
        <main className="albums-page__main">
            <section className="albums-page__new-releases">
                <h3>New Releases</h3>
                <NewAlbumReleases />
            </section>
        </main>
    )
}