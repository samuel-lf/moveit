import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  experienceToNextLevel: number
  activeChallenge: Challenge
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export const ChallengesProvider = ({ children }: ChallengesProviderProps ) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo Desafio 🎉', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        levelUp,
        activeChallenge,
        startNewChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge
    }}>
      { children }
    </ChallengesContext.Provider>
  )
}