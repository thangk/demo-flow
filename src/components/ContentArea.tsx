
interface Props {
    pagetitle: string,
    content: JSX.Element
}

const ContentArea = ({pagetitle, content}: Props ) => {

    return (
        <main className="contentarea__wrapper">
            
            <h1 className="contentarea__title">{pagetitle}</h1>

            {content}

        </main>
    )};

export default ContentArea;