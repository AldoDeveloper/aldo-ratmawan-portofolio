
import { Galleria } from 'primereact/galleria';
import { PropsGaleriaOptions } from '../../types/type';
import { responsiveOptionsGaleria } from '../../option/option.app';

interface PropsGaleriaProjects {
    items?: PropsGaleriaOptions[],
    position?: 'top' | 'bottom' | 'right' | 'left',
    numCount?: number
}

export default function GaleriaProjects<TYPE extends PropsGaleriaProjects>
    ({ items, position, numCount }: TYPE) {

    const itemGalleria = (item: PropsGaleriaOptions) => {
        return (
            <>
                <picture>
                    <source srcSet={item.img_url} type='image/png' />
                    <source srcSet={item.img_url} type='image/jpg' />
                    <img src={item.img_url}
                        alt={item.description}
                        style={{ width: '100%', display: 'mx-auto d-block' }} />
                </picture>
            </>
        )
    }
    const thumbnailGalleria = (item: PropsGaleriaOptions) => {
        return (
            <>
                <div style={{ width: '70px', maxHeight: '70px', overflow: 'hidden' }}>
                    <picture>
                        <source srcSet={item.img_url} type='image/png' />
                        <source srcSet={item.img_url} type='image/jpg' />
                        <img
                            src={item.img_url}
                            className='rounded'
                            alt={item.description}
                            style={{ width: '100%', display: 'block' }} />
                    </picture>
                </div>
            </>
        )
    }

    return (
        <Galleria
            value={items}
            item={itemGalleria}
            className='bg-dark'
            thumbnail={thumbnailGalleria}
            responsiveOptions={responsiveOptionsGaleria}
            thumbnailsPosition={position}
            numVisible={numCount} />
    )
}