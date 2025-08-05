function SectionHeaders({subHeader, mainHeader}: { subHeader: string, mainHeader: string }) {
    return (
        <>
            <h3 className="uppercase text-primary text-semibold leading-4">
                {subHeader}
            </h3>
            <h2 className="text-secondary font-bold text-4xl italic">{mainHeader}</h2>
        </>
    )
}

export default SectionHeaders;