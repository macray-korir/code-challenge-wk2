import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [allBots, setAllBots] = useState([]);
  const [yourBotArmy, setYourBotArmy] = useState([]);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:8000/bots')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with fetched data
        setAllBots(data);
      })
      .catch((error) => {
        console.error('Error fetching bots:', error);
      });
  }, []);

  // Function to handle enlisting a bot into your army
  const enlistBot = (bot) => {
    setYourBotArmy((prevArmy) => [...prevArmy, bot]);
  };

  // Function to handle releasing a bot from your army
  const releaseBot = (botId) => {
    setYourBotArmy((prevArmy) => prevArmy.filter((bot) => bot.id !== botId));
  };

  // Function to handle discharging a bot permanently
  const dischargeBot = (botId) => {
    fetch(`http://localhost:8000/bots/${botId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
                // Remove the bot from the allBots state
        setAllBots((prevBots) => prevBots.filter((bot) => bot.id !== botId));
      })
      .catch((error) => {
        console.error('Error discharging bot:', error);
      });
  };

  return (
    <div className="App">
      <h1>Bots</h1>
      <ul className="bot-list">
        {allBots.map((bot) => (
          <li key={bot.id} className="bot-item">
            <img src={bot.avatar_url} alt="Bot Avatar" className="bot-avatar" />
            <h3>{bot.name}</h3>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <button onClick={() => enlistBot(bot)}>Enlist</button>
            <button onClick={() => releaseBot(bot.id)}>Release</button>
            <button onClick={() => dischargeBot(bot.id)}>Discharge</button>
          </li>
        ))}
      </ul>

      <h1>Your Bot Army</h1>
      <ul className="your-bot-army">
        {yourBotArmy.map((bot) => (
          <li key={bot.id} className="bot-item">
            <img src={bot.avatar_url} alt="Bot Avatar" className="bot-avatar" />
            <h3>{bot.name}</h3>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <button onClick={() => releaseBot(bot.id)}>Release</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
