# Implementação de um deferrable
# Neste exemplo é mostrada uma aplicação real de um deferrable.
# Deferrables são objetos que podem retornar sucesso ou erro.
# Podemos definir callbacks para os dois status. Os status são
# definidos dentro do próprio deferrable após a operação ser
# executada. É simulada uma operação que leva 5 segundos para ser
# executada e depois o status do deferrable é setado como sucesso.
# Note que podemos passar parâmetros para os callbacks
require 'eventmachine'

class MyDef
  include EM::Deferrable

  def do_work(data)
    sleep(5)
    succeed("Hello world", "Fabio")
  end
end

EM.run do    
  df = MyDef.new
  df.do_work("some data")
  df.callback do |msg, name|
    puts "#{msg} #{name}"
  end
  df.errback { puts "Deferrable error"}
end