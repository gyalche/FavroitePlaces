import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../utils/database';

export default function Allplaces({ navigation, route }) {
  const [loadedState, setLoadedState] = useState(initialState);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const place = await fetchPlaces();
      setLoadedState(place);
    }
    if (isFocused && route.params) {
      // setLoadedState((cur) => [...cur, route.params.place]);
      loadPlaces();
    }
  }, []);
  return <PlacesList places={loadedState} />;
}
