
interface Props {
    pagetitle: string,
    content: JSX.Element
}

const ContentArea = ({pagetitle, content}: Props ) => {

    return (
        <main className="p-12 flex flex-col gap-12 w-full h-fit">
            
            <h2>{pagetitle}</h2>

            {content}

        </main>
    )};

export default ContentArea;