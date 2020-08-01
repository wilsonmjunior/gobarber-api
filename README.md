# Recuperação de senha

**RF(Requisitos funcionais)**
- O usuário deve poder recuperar a sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF(Requisitos não funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envio de e-mails em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN(Regras de negócio)**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Atualização do perfil

**RF(Requisitos funcionais)**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN(Regras de negócio)**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# Painel de prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache (Talvez em tempo-real);
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador (Listando dias disponiveis);
- O usuário deve poder listar horários disponiveis em um dia especifico de um prestador(Listando horarios disponiveis);

- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenadas em cache;

**RN**

- Os agendamentos devem estar disponíveis entre 8h - 18h (Primeiro às 8h e o último às 17h);
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar serviços consigo mesmo;
- Cada agendamento deve dura 1h exatamente;
