# Neste exemplo é implementada uma fila que sempre fica checando
# se existe um novo item (fila sem fim)
require 'eventmachine'

EM.run do
  q = EM::Queue.new

  work = Proc.new do |item|
    puts "Got #{item} from queue"
    EM.next_tick { q.pop(&work) }
  end

  EM.defer do
    10.times do |i|
      q.push(i)
      sleep(1)
    end
    EM.stop
  end

  q.pop(&work)

  puts "end"
end