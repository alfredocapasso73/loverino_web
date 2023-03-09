import React, {useState, useEffect} from "react";

const UserFullImages = (props) => {
    const [currentImage, setCurrentImage] = useState('');
    const [currentImgPosition, setCurrentImgPosition] = useState(0);
    const image_base_path = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/big-picture`;

    useEffect(() => {
        if(props.user.pictures.length){
            setCurrentImage(`${image_base_path}-${props.user.pictures[0]}`);
        }
    }, []);

    const browseImages = (direction) => {
        let new_position;
        if(direction === 'b'){
            if(currentImgPosition === 0){
                new_position = props.user?.pictures?.length-1;
                setCurrentImgPosition(new_position);
            }
            else{
                new_position = currentImgPosition-1;
                setCurrentImgPosition(new_position);
            }
        }
        else{
            if(currentImgPosition === props.user?.pictures?.length-1){
                new_position = 0;
                setCurrentImgPosition(new_position);
            }
            else{
                new_position = currentImgPosition+1;
                setCurrentImgPosition(new_position);
            }
        }
        const img_url = `${image_base_path}-${props.user.pictures[new_position]}`;
        setCurrentImage(img_url);
    }

    return(
        <div className="text-center" style={{padding: '15px', position: 'relative'}}>
            <img onClick={props.imageClose} alt="" loading="lazy" className="pointer" src={currentImage}  style={{width: '100%'}} />
            <i onClick={props.imageClose} className={`fa-solid fa-close close_pic_inside_image`}></i>
            {
                props.user.pictures.length > 1 &&
                <div className="pic_navigator">
                    <div className="pic_navigator_left">
                        <img src="/img/icons8-chevron-left-32.png" alt="left" onClick={e => browseImages('b')}/>
                    </div>
                    <div className="pic_navigator_right">
                        <img src="/img/icons8-chevron-right-32.png" alt="left" onClick={e => browseImages('f')} />
                    </div>
                </div>
            }
        </div>
    );
}
export default UserFullImages;