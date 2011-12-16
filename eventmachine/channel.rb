# Implementação de dois clientes se conectando a um canal.
# Os clientes se inscrevem no canal e passam a receber as 
# mensagens enviadas para o canal até # que um deles se
# remove do canal e apenas um continua recebendo.
require 'eventmachine'

@counter = 0

EM.run do
  c = EM::Channel.new
  
  # First subscriber
  c.subscribe { |m| puts "1: #{m}" }    

  # Second subscriber
  cid = c.subscribe do |m| 
    puts "2: #{m}"
    c.unsubscribe(cid) if @counter == 10
  end    

  # Send counter to channel each 1 second
  EM.add_periodic_timer(1) do
    @counter += 1
    c << @counter
  end
end