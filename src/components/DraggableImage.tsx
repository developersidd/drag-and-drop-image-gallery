import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from 'react';
import useDndContext from "../hooks/useDndContext";
import DraggableImageCheckbox from "./DraggableImageCheckbox";
interface DraggableImageProps {
    data: { id: string, image: string, ind: number, isDragging: boolean };
}
const DraggableImage = memo((props: DraggableImageProps) => {
    const { data: { id, image, isDragging, } } = props || {};
    const { selectedImages } = useDndContext();

    const { attributes, listeners, setNodeRef, transform, transition, active, } =
        useSortable({
            id: id,
            transition: {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            }
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // checking is user selected this image or not 
    const isSelected = selectedImages.includes(id);

    return (
        <div
            className={` relative rounded-xl border-2 border-gray-300  w-full  group/draggableImage`}        >
            <div
                style={{ ...style }}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className={` ${active ? "rounded-xl border border-gray-300 cursor-grab" : ""} h-full`}
            >
                <img
                    className="rounded-xl w-full h-full object-cover"
                    src={image}
                />
                <div className={`${isSelected && !isDragging ? "opacity-60 bg-white" : "invisible opacity-0 bg-black/40"} transition-all  z-30  ${(isDragging || isSelected) ? "" : "group-hover/draggableImage:opacity-100 group-hover/draggableImage:visible"} cursor-grab absolute rounded-xl top-0 left-0 w-full h-full `} />
            </div>
            {
                isDragging ? null : <DraggableImageCheckbox id={id} />
            }
        </div>
    );
});
export default DraggableImage;