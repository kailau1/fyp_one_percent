import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

interface ScrollViewHabitColourCodesProps {
  isSmall?: boolean;
  selectedColour?: string;
  onSelectColour?: (color: string) => void;
}

const ScrollViewHabitColourCodes: React.FC<ScrollViewHabitColourCodesProps> = ({ isSmall, selectedColour, onSelectColour }) => {
  let colourCodes: Array<string> = ["#A7C7E7", "#B4E197", "#F8C8DC", "#D6A4E7", "#FDFD96", "#FFD1A9", "#AAF0D1", "#E3D4FC", "#FCA3B7", "#AEEDEE"];
  const [currentSelectedColour, setCurrentSelectedColour] = useState(selectedColour || colourCodes[0]);

  useEffect(() => {
    setCurrentSelectedColour(selectedColour || colourCodes[0]);
  }, [selectedColour]);

  const handleColourSelect = (color: string) => {
    setCurrentSelectedColour(color);
    if (onSelectColour) {
      onSelectColour(color);
    }
  };

  return (
    <ScrollView style={styles.colours} horizontal={true}>
      {colourCodes.map((colour) => (
        <TouchableOpacity
          key={colour}
          style={[styles.colourCircle, isSmall && styles.colourCircleSmall, { backgroundColor: colour, borderWidth: currentSelectedColour === colour ? 2 : 0, borderColor: '#000' }]}
          onPress={() => handleColourSelect(colour)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  colours: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '5%',
  },
  colourCircle: {
    borderRadius: 30,
    height: 60,
    width: 60,
    margin: '1%',
  },
  colourCircleSmall: {
    borderRadius: 15,
    height: 30,
    width: 30,
    margin: '1%',
  },
});

export default ScrollViewHabitColourCodes;