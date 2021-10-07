export default function SectionTitle({title}) {
    return (
        <div className="flex p-1 px-4 dark:bg-gray-1000 rounded-tl-sm rounded-tr-sm border-b border-gray-600 h-min-content">
            <h2 className="dark:text-white uppercase text-xs font-medium">{title}</h2>
        </div>
    );
}