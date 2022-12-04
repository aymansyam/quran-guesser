import React, { useState } from 'react';
import { Text, View } from 'react-native';

function Pointsystem() {
    return (
        // points system
        <View>
            <Text>Points System</Text>
            <Text>1. A perfect score is 5000 points {"("}exact guess on hard difficulty{")"}</Text>
            <Text>2. Points decrease the further away you are from the correct ayah</Text>
            <Text>3. The maximum possible score is 50000</Text>
            <Text>4. The difficulty level determines the multiplier of points you earn for each correct guess</Text>
        </View>
    
        
    )
}

export default Pointsystem;