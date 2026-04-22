using Microsoft.EntityFrameworkCore;
using FitUpSensei.API.Models;

namespace FitUpSensei.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Entrenador> Entrenadores { get; set; }
    public DbSet<Ejercicio> Ejercicios { get; set; }
    public DbSet<Rutina> Rutinas { get; set; }
    public DbSet<RutinaEjercicio> RutinaEjercicios { get; set; }
    public DbSet<RutinaAsignada> RutinasAsignadas { get; set; }
    public DbSet<Sesion> Sesiones { get; set; }
    public DbSet<SesionEjercicio> SesionEjercicios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Cliente>(e =>
        {
            e.Property(c => c.PesoKg).HasColumnType("numeric(5,2)");
            e.Property(c => c.EsaturaCm).HasColumnType("numeric(5,2)");
            e.Property(c => c.Imc).HasColumnType("numeric(5,2)");
            e.Property(c => c.HorasSuenoPromedio).HasColumnType("numeric(3,1)");
        });

        modelBuilder.Entity<Entrenador>(e =>
        {
            e.Property(en => en.Puntuacion).HasColumnType("numeric(3,2)");
        });

        modelBuilder.Entity<Ejercicio>(e =>
        {
            e.Property(ej => ej.MusculosImplicados).HasColumnType("text[]");
        });

        modelBuilder.Entity<RutinaEjercicio>(e =>
        {
            e.Property(re => re.PesoObjetivoKg).HasColumnType("numeric(6,2)");
        });

        modelBuilder.Entity<SesionEjercicio>(e =>
        {
            e.Property(se => se.PesoRealizadoKg).HasColumnType("numeric(6,2)");
        });
    }
}
