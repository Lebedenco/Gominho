const messageReactionAdd = async (client, reaction, user) => {
  if (reaction._emoji.name == '☑️' && reaction.message.id === '722158831060254740') {
    const u = client.guilds.cache.get('634474377370402836').members.cache.get(user.id);

    let role = u.guild.roles.cache.filter(role => role.name === 'NOVATO');

    u.roles.remove(role, 'Novo membro!')
      .then(() => {
        console.log(`[NOVO MEMBRO] ${ u.displayName } confirmou que leu as regras!`);
      })
      .catch(error => console.log(error));
  }
};

module.exports = {
  name: 'messageReactionAdd',
  run: messageReactionAdd
};