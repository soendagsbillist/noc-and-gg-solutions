import java.util.Iterator;
ParticleSystem ps;
Repeller repeller;
RepellerSystem repellers;

void setup() {
    size(640, 360);
    ps = new ParticleSystem(new PVector(width/2, 50));
    repellers = new RepellerSystem();
}

void draw() {
    background(100);
    PVector gravity = new PVector(0, 0.1);

    ps.applyForce(gravity);
    ps.addParticle();
    ps.run();

    repellers.run(ps);
}

class Particle {
    PVector location;
    PVector velocity;
    PVector acceleration;
    float lifespan;

    PVector gravity;

    Particle(PVector l) {
	location = l.get();
	velocity = new PVector(random(-1, 1), random(-2, 0));
	acceleration = new PVector();
	lifespan = 255;
	gravity = new PVector(0, 0.05);
    }

    void run() {
	update();
	render();
    }

    void render() {
	stroke(0, lifespan);
	fill(0, lifespan);
	ellipse(location.x, location.y, 10, 10);
    }

    void update() {
	velocity.add(acceleration);
	location.add(velocity);
	acceleration.mult(0);
	lifespan -= 2.0;
    }

    void applyForce(PVector f) {
	PVector force = f.get();
	acceleration.add(force);
    }

    boolean isDead() {
	if (lifespan < 0.0) {
	    return true;
	} else {
	    return false;
	}
    }
}

class ParticleSystem {
    ArrayList<Particle> particles;
    PVector origin;

    ParticleSystem(PVector location) {
	origin = location.get();
	particles = new ArrayList<Particle>();
    }

    void addParticle() {
	particles.add(new Particle(origin));
    }

    void applyForce(PVector f) {
	for (Particle p: particles) {
	    p.applyForce(f);
	}
    }

    void applyRepeller(Repeller r) {
	for (Particle p: particles) {
	    PVector force = r.repel(p);
	    p.applyForce(force);
	}
    }

    void run() {
	Iterator<Particle> it = particles.iterator();
	while (it.hasNext()) {
	    Particle p = it.next();
	    p.run();
	    if (p.isDead()) {
		it.remove();
	    }
	}
    }
}

class Repeller {
    PVector location;
    float strength;

    Repeller(PVector l) {
	location = l.get();
	strength = 100;
    }

    void render() {
	stroke(255);
	fill(255);
	ellipse(location.x, location.y, 40, 40);
    }

    PVector repel(Particle p) {
	PVector direction = PVector.sub(location, p.location);
	float d = direction.mag();
	direction.normalize();
	d = constrain(d,5,100);
	float force = -1 * strength / (d * d);
	direction.mult(force);
	return direction;
    }
}

class RepellerSystem {
    ArrayList<Repeller> repellers;

    RepellerSystem() {
	repellers = new ArrayList<Repeller>();
    }

    void run(ParticleSystem ps) {
	for (Repeller r: repellers) {
	    r.render();
	    ps.applyRepeller(r);
	}
    }

    void addRepeller(PVector location) {
	repellers.add(new Repeller(location));
    }
}

void mousePressed() {
    repellers.addRepeller(new PVector(mouseX, mouseY));
}
