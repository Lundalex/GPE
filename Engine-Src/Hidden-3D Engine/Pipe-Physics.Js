
    // Calculate Physics Function
    function DoCalculatePhysics(){
        
        for (let i = 0; i < RegObjects.length; i++) {
            
            const NewHitbox1 = RegObjects[i].NextHitboxRelativeBoundraryXYZ()

            if(RegObjects[i].ObjectType == "Physics"){
            RegObjects[i].VelocityX -= RegObjects[i].ConstantForceX * ProgramIncrementHertz
            RegObjects[i].VelocityY -= RegObjects[i].ConstantForceY * ProgramIncrementHertz
            RegObjects[i].VelocityZ -= RegObjects[i].ConstantForceZ * ProgramIncrementHertz
            }
            for (let o = 0; o < RegObjects.length; o++) {

                if(i != o){
                
                    const NewHitbox2 = RegObjects[o].NextHitboxRelativeBoundraryXYZ()

                if((((NewHitbox1[0] > NewHitbox2[0]) && (NewHitbox1[0] < NewHitbox2[1])) || ((NewHitbox1[1] > NewHitbox2[0]) && (NewHitbox1[1] < NewHitbox2[1]))) && (((NewHitbox1[2] > NewHitbox2[2]) && (NewHitbox1[2] < NewHitbox2[3])) || ((NewHitbox1[3] > NewHitbox2[2]) && (NewHitbox1[3] < NewHitbox2[3]))) && (((NewHitbox1[4] > NewHitbox2[4]) && (NewHitbox1[4] < NewHitbox2[5])) || ((NewHitbox1[5] > NewHitbox2[4]) && (NewHitbox1[5] < NewHitbox2[5])))){

                    let Continue = OnCollision(i,o)
                    if(Continue == 1){return}

                    // Collision Resolve command is NOT executed if either Object1 or Object2 are not PHYSICS OBJECTS
                    if(RegObjects[i].ObjectType == "Physics" && RegObjects[o].ObjectType == "Physics"){

                        if(Continue == 2){
                            ResolveCollisionWithSolid(i,o)
                        }
                        else if(Continue == 3){
                            ResolveCollisionElasticity(i,o)
                        }
                    }
                }
            }
        }

                        // Add VelocityX
                if(RegObjects[i].VelocityX > 0){
                    RegObjects[i].VelocityX -= TimeFriction * ProgramIncrementHertz
                    
                    if(RegObjects[i].VelocityX < 0){
                        RegObjects[i].VelocityX = 0
                    }
                    
                }
                else if(RegObjects[i].VelocityX < 0){
                    RegObjects[i].VelocityX += TimeFriction * ProgramIncrementHertz
                    
                    if(RegObjects[i].VelocityX > 0){
                        RegObjects[i].VelocityX = 0
                    }
                    
                }
                if(RegObjects[i].VelocityX != 0){
                    RegObjects[i].LeaderX += RegObjects[i].VelocityX * ProgramIncrementHertz * 0.05
                }
                
                // Add VelocityY
                if(RegObjects[i].VelocityY > 0){
                    RegObjects[i].VelocityY -= TimeFriction * ProgramIncrementHertz
                    
                    if(RegObjects[i].VelocityY < 0){
                        RegObjects[i].VelocityY = 0
                    }
                    
                }
                else if(RegObjects[i].VelocityY < 0){
                    RegObjects[i].VelocityY += TimeFriction * ProgramIncrementHertz
                    
                    if(RegObjects[i].VelocityY > 0){
                        RegObjects[i].VelocityY = 0
                    }
                    
                }
                if(RegObjects[i].VelocityY != 0){
                    RegObjects[i].LeaderY += RegObjects[i].VelocityY * ProgramIncrementHertz * 0.05
                }
                
                // Add VelocityZ
                if(RegObjects[i].VelocityZ > 0){
                    RegObjects[i].VelocityZ -= TimeFriction * ProgramIncrementHertz
                    
                    if(RegObjects[i].VelocityX < 0){
                        RegObjects[i].VelocityX = 0
                    }
                    
                }
                else if(RegObjects[i].VelocityZ < 0){
                    RegObjects[i].VelocityZ += TimeFriction * ProgramIncrementHertz
                    
                    if(RegObjects[i].VelocityZ > 0){
                        RegObjects[i].VelocityZ = 0
                    }
                    
                }
                if(RegObjects[i].VelocityZ != 0){
                    RegObjects[i].LeaderZ += RegObjects[i].VelocityZ * ProgramIncrementHertz * 0.05
                }
        }
    }
    // Calculate Physics Function



// Physics Functions
function ResolveCollisionWithSolid(Object1, Object2){

    let Hitbox1 = RegObjects[Object1].HitboxRelativeBoundraryXYZ()
    let Hitbox2 = RegObjects[Object2].HitboxRelativeBoundraryXYZ()

    // Resolve X
    if(!(((Hitbox1[0] > Hitbox2[0]) && (Hitbox1[0] < Hitbox2[1])) || ((Hitbox1[1] > Hitbox2[0]) && (Hitbox1[1] < Hitbox2[1])))){
        EventSolidResolveX(Object1, Object2)

        
        let Modifier = 1
        let NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
        let NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        
        while((((NewHitbox1[0] > NewHitbox2[0]) && (NewHitbox1[0] < NewHitbox2[1])) || ((NewHitbox1[1] > NewHitbox2[0]) && (NewHitbox1[1] < NewHitbox2[1])))){
            Modifier -= 0.01
            NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
            NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        }
        RegObjects[Object1].LeaderX += RegObjects[Object1].VelocityX  * ProgramIncrementHertz * 0.05 * (Modifier)
        RegObjects[Object2].LeaderX += RegObjects[Object2].VelocityX  * ProgramIncrementHertz * 0.05 * (Modifier)
        
        RegObjects[Object1].VelocityX = 0
        RegObjects[Object2].VelocityX = 0
    }

    // Resolve Y
    if(!(((Hitbox1[2] > Hitbox2[2]) && (Hitbox1[2] < Hitbox2[3])) || ((Hitbox1[3] > Hitbox2[2]) && (Hitbox1[3] < Hitbox2[3])))){
        EventSolidResolveY(Object1, Object2)

        
        let Modifier = 1
        let NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
        let NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        
        while((((NewHitbox1[2] > NewHitbox2[2]) && (NewHitbox1[2] < NewHitbox2[3])) || ((NewHitbox1[3] > NewHitbox2[2]) && (NewHitbox1[3] < NewHitbox2[3])))){
            Modifier -= 0.01
            NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
            NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        }
        RegObjects[Object1].LeaderY += RegObjects[Object1].VelocityY  * ProgramIncrementHertz * 0.05 * (Modifier)
        RegObjects[Object2].LeaderY += RegObjects[Object2].VelocityY  * ProgramIncrementHertz * 0.05 * (Modifier)

        RegObjects[Object1].VelocityY = 0
        RegObjects[Object2].VelocityY = 0
    }

    // Resolve Z
    if(!(((Hitbox1[4] > Hitbox2[4]) && (Hitbox1[4] < Hitbox2[5])) || ((Hitbox1[5] > Hitbox2[4]) && (Hitbox1[5] < Hitbox2[5])))){
        EventSolidResolveZ(Object1, Object2)

        
        let Modifier = 1
        let NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
        let NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        
        while((((NewHitbox1[4] > NewHitbox2[4]) && (NewHitbox1[4] < NewHitbox2[5])) || ((NewHitbox1[5] > NewHitbox2[4]) && (NewHitbox1[5] < NewHitbox2[5])))){
            Modifier -= 0.01
            NewHitbox1 = RegObjects[Object1].NextHitboxRelativeBoundraryXYZ(Modifier)
            NewHitbox2 = RegObjects[Object2].NextHitboxRelativeBoundraryXYZ(Modifier)
        }
        RegObjects[Object1].LeaderZ += RegObjects[Object1].VelocityZ  * ProgramIncrementHertz * 0.05 * (Modifier)
        RegObjects[Object2].LeaderZ += RegObjects[Object2].VelocityZ  * ProgramIncrementHertz * 0.05 * (Modifier)

        RegObjects[Object1].VelocityZ = 0
        RegObjects[Object2].VelocityZ = 0
    }

}

function ResolveCollisionElasticity(Object1, Object2){ // Also uses Global variable "Elasticity"
                                                
                        // Collision X
                        
                        // Elasticity = 0 Method
                        const ForceX1 = RegObjects[Object1].Mass * RegObjects[Object1].VelocityX
                        const ForceX2 = RegObjects[Object2].Mass * RegObjects[Object2].VelocityX
                        
                        const ForceTotalX = ForceX1 + ForceX2
                        
                        const NoneElasticityVelocityX1 = ForceTotalX*0.5 / RegObjects[Object1].Mass
                        const NoneElasticityVelocityX2 = ForceTotalX*0.5 / RegObjects[Object2].Mass
                        
                        
                        // Elasticity = 1 Method
                        
                        const MaxElasticityVelocityX1 = ForceX2 / RegObjects[Object1].Mass
                        const MaxElasticityVelocityX2 = ForceX1 / RegObjects[Object2].Mass
                        
                        // Weighted
                        
                        RegObjects[Object1].VelocityX = ((NoneElasticityVelocityX1 * (1-Elasticity)) + (MaxElasticityVelocityX1 * Elasticity))
                        RegObjects[Object2].VelocityX = ((NoneElasticityVelocityX2 * (1-Elasticity)) + (MaxElasticityVelocityX2 * Elasticity))
                        
                        // Collision Y
                        
                        // Elasticity = 0 Method
                        const ForceY1 = RegObjects[Object1].Mass * RegObjects[Object1].VelocityY
                        const ForceY2 = RegObjects[Object2].Mass * RegObjects[Object2].VelocityY
                        
                        const ForceTotalY = ForceY1 + ForceY2
                        
                        const NoneElasticityVelocityY1 = ForceTotalY*0.5 / RegObjects[Object1].Mass
                        const NoneElasticityVelocityY2 = ForceTotalY*0.5 / RegObjects[Object2].Mass
                        
                        
                        // Elasticity = 1 Method
                        
                        const MaxElasticityVelocityY1 = ForceY2 / RegObjects[Object1].Mass
                        const MaxElasticityVelocityY2 = ForceY1 / RegObjects[Object2].Mass
                        
                        // Weighted
                        
                        RegObjects[Object1].VelocityY = ((NoneElasticityVelocityY1 * (1-Elasticity)) + (MaxElasticityVelocityY1 * Elasticity))
                        RegObjects[Object2].VelocityY = ((NoneElasticityVelocityY2 * (1-Elasticity)) + (MaxElasticityVelocityY2 * Elasticity))
                        
                        // Collision Z
                        
                        // Elasticity = 0 Method
                        const ForceZ1 = RegObjects[Object1].Mass * RegObjects[Object1].VelocityZ
                        const ForceZ2 = RegObjects[Object2].Mass * RegObjects[Object2].VelocityZ
                        
                        const ForceTotalZ = ForceZ1 + ForceZ2
                        
                        const NoneElasticityVelocityZ1 = ForceTotalZ*0.5 / RegObjects[Object1].Mass
                        const NoneElasticityVelocityZ2 = ForceTotalZ*0.5 / RegObjects[Object2].Mass
                        
                        
                        // Elasticity = 1 Method
                        
                        const MaxElasticityVelocityZ1 = ForceZ2 / RegObjects[Object1].Mass
                        const MaxElasticityVelocityZ2 = ForceZ1 / RegObjects[Object2].Mass
                        
                        // Weighted
                        
                        RegObjects[Object1].VelocityZ = ((NoneElasticityVelocityZ1 * (1-Elasticity)) + (MaxElasticityVelocityZ1 * Elasticity))
                        RegObjects[Object2].VelocityZ = ((NoneElasticityVelocityZ2 * (1-Elasticity)) + (MaxElasticityVelocityZ2 * Elasticity))
}
