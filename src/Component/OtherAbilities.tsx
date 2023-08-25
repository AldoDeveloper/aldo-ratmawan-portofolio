import React from "react";
import { Container, Card } from 'react-bootstrap';
import { Carousel } from 'primereact/carousel';
import { Rating } from 'primereact/rating';
import { otherAbilitiesProps } from "../../types/type";
import { collection, Firestore, onSnapshot } from 'firebase/firestore'
import { FirebaseContextProvider } from "../../context/ContextApp";
import { showImagesPortfolio } from "../../firebase/storage/showStorage";

const responsiveOptions = [
  {
    breakpoint: '1199px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '991px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1
  }
];

export default function OtherAbilities() {
  const firebaseApp = React.useContext(FirebaseContextProvider);
  const [otherAbilities, setOtherAbilities] = React.useState<otherAbilitiesProps[]>([]);
  const docRef = collection(firebaseApp?.appInitialize as Firestore, 'otherAbilities');

  const configFirebaseData = () : void =>{
    setOtherAbilities([])
    onSnapshot(docRef, async (snapshot) => {
      snapshot.docs.map(async (values) => {
        const pathFull = await showImagesPortfolio(firebaseApp?.appStorage, values?.data()?.path);
        var data: otherAbilitiesProps = {
          name: values?.data()?.name,
          description: values?.data()?.description,
          start: values?.data()?.start,
          path: pathFull as any,
        }
        setOtherAbilities((values) => ([...values, data]))
      })
    });
  }
  React.useEffect(() => {
    configFirebaseData()
  }, []);

  const productTemplate = (product: otherAbilitiesProps) => {
    return (
      <Card className='me-3'>
        <Card.Body className="text-center">
          <div className="mb-3">
            <h4>{product?.name}</h4>
            <picture>
              <source srcSet={product?.path} type="image/png" />
              <source srcSet={product?.path} type="image/jpg" />
              <img src={product?.path}
                width={70}
                height={70}
                alt={product.name}
                className="w-6 mx-auto d-block" />
            </picture>
          </div>
          <div>
            <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
              <Rating
                value={product?.start}
                readOnly
                cancel={false} />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };
  return (
    <React.Fragment>
      <h1 className='fw-bold text-center'>Other abilities</h1>
      <section className="static-banners">
        <Container>
          <Carousel value={otherAbilities}
            numVisible={4}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            className="custom-carousel" 
            circular
            autoplayInterval={3000}
            showIndicators={false}
            itemTemplate={productTemplate} />
        </Container>
      </section>
    </React.Fragment>
  )
}