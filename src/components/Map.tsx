import { ReloadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { storeSiderComponentCollapseState } from '../state/componentState';
import { selectedStoreState, storesState } from '../state/storeState';
import { store } from '../types/store';

const { kakao } = window;

interface IMap {
  height: number;
}

const Map = ({ height }: IMap) => {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [mapBoundChanged, setMapBoundChanged] = useState<boolean>(false);
  const [mapBounds, setMapBounds] = useState<number[]>([]);
  const stores = useRecoilValueLoadable(storesState(mapBounds));
  const [, setSelectedStore] = useRecoilState(selectedStoreState);
  const [, setStoreComponentCollapse] = useRecoilState(storeSiderComponentCollapseState);

  const refreshMapBounds = (map: any) => {
    console.log('### map', map);
    const bounds = map.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    setMapBounds([southWest.getLng(), southWest.getLat(), northEast.getLng(), northEast.getLat()]);
  };

  useEffect(() => {
    if (!map && kakao) {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const option = {
          center: new kakao.maps.LatLng(37.561201, 127.038542),
          level: 5,
        };
        const map = new kakao.maps.Map(mapContainer, option);

        setMap(map);
        refreshMapBounds(map);

        kakao.maps.event.addListener(map, 'click', function () {
          setSelectedStore(null);
          setStoreComponentCollapse(true);
        });

        kakao.maps.event.addListener(map, 'bounds_changed', function () {
          setMapBoundChanged(true);
        });
      });
    }
  }, []);

  useEffect(() => {
    if (stores.state === 'hasValue' && map) {
      const storeMarkers = stores.contents.map((store: store) => {
        const { latitude, longitude } = store;
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', function () {
          setSelectedStore(store);
          setStoreComponentCollapse(false);
        });

        return marker;
      });

      setMarkers(storeMarkers);
    }
  }, [stores]);

  useEffect(() => {
    if (map && mapBoundChanged) {
      message.config({ top: 60 });
      message.info({
        key: 'refreshStoresMessage',
        content: '여기 안주를 볼까?',
        icon: <ReloadOutlined />,
        duration: 0,
        onClick: () => {
          message.destroy('refreshStoresMessage');

          setMapBoundChanged(false);
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          setMarkers([]);
          refreshMapBounds(map);
        },
      });
    }
  }, [mapBoundChanged]);

  return <>{kakao ? <div id="map" style={{ width: '100%', height: `${height}px` }} /> : '지원하지 않습니다.'}</>;
};

export default Map;
